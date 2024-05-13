<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\EmailListData;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class RequestManageController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request){

        $destinon = $request->email;
        $correoarr = array_map('trim', explode(",", $destinon));

        $results = [];
        $finalResults = [];
        $emailsToInsert = [];
        $now = Carbon::now();

        if(is_array($correoarr)){
            $allEmails = EmailListData::where('project_id',$request->project_id)->whereIn('email',$correoarr)->get();
            $emailExists = $allEmails->pluck('email')->toArray();
        }else{
            $allEmails = [] ;
            $emailExists = [];
        }

        foreach ($correoarr as $email) {

            $systemStatus = 0;
            $comments = "Bad email";

            $result = [
                'email' => $email,
                'domain_valid' => false,
                'format_valid' => false,
                'email_valid' => false,
                'good_email' => false,
                'kickbox' => 'No Response',
            ];

            $final = [
                'email' =>$email,
                'status' => false,
            ];

            if(!in_array($email,$emailExists)){

                // Validate email format
                $result['format_valid'] = $this->isEmailFormatValid($email);

                // Validate domain
                if ($result['format_valid']) {
                    $result['domain_valid'] = $this->isValidDomain($email);
                }

                // Validate email address
                if ($result['format_valid'] && $result['domain_valid']) {
                    $result['email_valid'] = $this->isEmailNameValid($email);
                }

                // Check if email is good
                if ($result['format_valid'] && $result['domain_valid'] && $result['email_valid']) {
                    $result['good_email'] = $this->isEmailGood($email);
                }

                if($result['good_email']){

                    // Send to API Request To KickBox
                    $apiResponse = $this->sendKickBox($email,$request->api_key);

                    $systemStatus = isset($apiResponse['status']) ? $apiResponse['status'] : 1 ;
                    $comments = isset($apiResponse['comments']) ? $apiResponse['comments'] : "Good email";
                    $final['status'] = $apiResponse['status'] ;
                    $result['kickbox'] = $apiResponse ;

                }else{
                    $systemStatus = 0 ;
                    $comments = "Bad Email";
                    $final['status'] = 0 ;
                }

                // Prepare data to insert
                $emailsToInsert[] = [
                    'project_id' => $request->project_id,
                    'email' => $email,
                    'system_status' => $systemStatus,
                    'payload' => json_encode($result, true),
                    'comments' => $comments,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];

            }else{
                $emailData = $allEmails->where('email',$email)->first();
                if($emailData){
                    $systemStatus = $emailData->system_status;
                    if($systemStatus == 0){
                        $final['status'] = 0 ;
                    }else{
                        $final['status'] = 1 ;
                    }
                }else{
                    $final['status'] = 0 ;
                }
            }

            // Add result to the results array
            $finalResults[] = $final;
        }

        // Insert or update all emails at once
        EmailListData::insert($emailsToInsert);

        return response()->json([
            "code" => 200,
            "status" => true,
            'data' => $finalResults
        ]);

        // return response()->json(, Response::HTTP_OK);
    }

    public function sendKickBox($email,$apikey){
        $result = [];
        $url = env('KICKBOX_API_URL');

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $url . '?email=' . urlencode($email) . '&apikey=' . $apikey,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
        ));

        $response = curl_exec($curl);

        $responseData = json_decode($response, true);

        if ($responseData['success']) {
            $reason = $responseData['reason'];

            switch ($reason) {
                case 'accepted_email':
                    $comments = "Good email";
                    $status = 1;
                    break;
                case 'invalid_email':
                    $comments = "Specified email is not a valid email address syntax";
                    $status = 0;
                    break;
                case 'invalid_domain':
                    $comments = "Domain for email does not exist";
                    $status = 0;
                    break;
                case 'rejected_email':
                    $comments = "Email address was rejected by the SMTP server, email address does not exist";
                    $status = 0;
                    break;
                case 'low_quality':
                    $comments = "Email has quality issues that may make it a risky or low-value address";
                    $status = 1;
                    break;
                case 'low_deliverability':
                    $comments = "Email deliverability cannot be guaranteed";
                    $status = 1;
                    break;
                case 'no_connect':
                case 'timeout':
                case 'invalid_smtp':
                case 'unavailable_smtp':
                    $comments = "Could not connect to SMTP server or SMTP server issues / SMTP session timed out / SMTP server returned an unexpected/invalid response / SMTP server was unavailable to process our request";
                    $status = 0;
                    break;
                case 'unexpected_error':
                    $comments = "An unexpected error has occurred";
                    $status = 0;
                    break;
                default:
                    $comments = "Unknown status";
                    $status = 0;
                    break;
            }
        } else {
            $comments = "Error occurred during validation";
            $status = 0;
        }

        $result['comments']  = $comments;
        $result['status']  = $status;
        $result['response']  = $responseData;

        return $result ;

    }
     /**
      * Check if the email format is valid.
      *
      * @param string $email
      * @return bool
      */
    private function isEmailFormatValid($email)
    {
     return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }

     /**
      * Check if the domain of the email address has valid MX records.
      *
      * @param string $email
      * @return bool
      */
    private function isValidDomain($email)
    {
        $domain = substr($email, strpos($email, '@') + 1);
        return checkdnsrr($domain, 'MX');
    }

     /**
      * Check if the email address before @ is valid or meaningful.
      *
      * @param string $email
      * @return bool
      */
    private function isEmailNameValid($email)
    {
        $name = substr($email, 0, strpos($email, '@'));
        // Implement your validation logic for the email name here
        // For example, check if it contains valid characters or meets certain criteria
        return true; // Placeholder return value
    }

     /**
      * Check if the email address is valid or bad.
      *
      * @param string $email
      * @return bool
      */
    private function isEmailGood($email)
    {
        // Implement your validation logic for checking if the email address is good or bad
        // For example, use third-party email validation services or custom checks
        return true; // Placeholder return value
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

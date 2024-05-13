<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ValidateEmail
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        // Check if email and project_id are both present and not null
        if (empty($request->email) || empty($request->project_id) ) {
            return response()->json(['error' => 'Both email and project_id are required'], Response::HTTP_BAD_REQUEST);
        }
        // $projectData = DB::table('projects')->where('code', $request->project_id)->where('status', 1)->first();
        $projectData = DB::table('projects')->where('code', $request->project_id);

        if (empty($projectData->first())) {
            return response()->json(['error' => 'Your project Id not found'], Response::HTTP_BAD_REQUEST);
        }

        $projectData = $projectData->where('status',1)->first();

        if (empty($projectData)) {
            return response()->json(['error' => 'Your project is inactive'], Response::HTTP_BAD_REQUEST);
        }

        $emails = explode(',', $request->email);

        if (count($emails) > 10) {
            return response()->json(['error' => 'Email array size exceeds the limit of 10'], Response::HTTP_BAD_REQUEST);
        }
        $api = DB::table('kickboxes')->where('id', $projectData->kickbox_id);
        $api_key = $api->value('api_key');
        $api_status = $api->where('status',1)->first();

        if (empty($api_status)) {
            return response()->json(['error' => 'API key is inactive'], Response::HTTP_BAD_REQUEST);
        }

        if (empty($api_key)) {
            return response()->json(['error' => 'API key not found'], Response::HTTP_BAD_REQUEST);
        }

        // Add $api_key to the $request object
        $request->merge(['api_key' => $api_key]);

        return $next($request);
    }
}

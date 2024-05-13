<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Project;
use App\Models\EmailListData;
use App\Repositories\Admin\ProjectRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProjectController extends Controller
{

    protected $projectRepository;
    public function __construct(ProjectRepository $projectRepository){
        $this->projectRepository = $projectRepository;
    }

    public function projectIndex(){
        $allData = DB::table('projects')
                ->leftJoin('kickboxes','projects.kickbox_id','kickboxes.id')
                ->select('projects.*','kickboxes.name')
                ->get();
        return Inertia::render('Module/Project/Index', [
            'allProjectData' => $allData
        ]);

    }
    public function projectCreate(){
        $kickbox = DB::table('kickboxes')->where('status',1)->get();
        return Inertia::render('Module/Project/Create',[
            'kickBoxData' =>$kickbox
        ]);
    }

    public function projectStore(Request $request){
        $result= $this->projectRepository->storeOrUpdate($request);
        return redirect()->route('admin.project.index')->with('success',$result['message']);
    }

    public function projectEdit($id){
        $result = $this->projectRepository->edit($id);
        $kickbox = DB::table('kickboxes')->where('status',1)->get();
        return Inertia::render('Module/Project/Edit',[
            'result'=>$result,
            'kickBox' => $kickbox
        ]);
    }

    public function projectUpdate(Request $request){
        $result = $this->projectRepository->update($request);

        return redirect()->route("admin.project.index")->with('success',$result['message']);
    }

    public function projectStatusUpdate(Request $request){
        $result = $this->projectRepository->update($request);

        return back()->with('success',$result['message']);
    }

    public function projectDelete($id){
        DB::table('projects')->where('id',$id)->delete();
        return back()->with('success', 'Project Delete Successfully');
    }

    public function EmailList(){

        $emailList = DB::table('email_lists_data')->get();
        return Inertia::render('Module/Project/EmailList',[
            'emailList'=>$emailList,
        ]);
    }

    public function emailStatus(Request $request){

        $email = EmailListData::find($request->id);
        $response = json_decode($email->payload,true);
        $response['selfComment']="this email manually transfer bad to good";
        $finalResponse = json_encode($response);
        if($email){
            $email->system_status = $request->status;
            $email->payload = $finalResponse;
            $email->save();
        }
        $emailList = DB::table('email_lists_data')->get();
        return $emailList;
    }
}

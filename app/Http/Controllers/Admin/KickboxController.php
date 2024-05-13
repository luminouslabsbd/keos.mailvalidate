<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Repositories\Admin\KickboxRepository;

class KickboxController extends Controller
{

    protected $kickBoxRepository;

    public function __construct(KickboxRepository $kickboxRepository){

        $this->kickBoxRepository = $kickboxRepository;

    }

    public function kickboxIndex(){
        $allData = DB::table('kickboxes')->get();
        return Inertia::render('Module/KickBox/Index', [
            'allKickBoxData' => $allData
        ]);

    }
    public function kickboxCreate(){
        return Inertia::render('Module/KickBox/Create');
    }

    public function kickboxStore(Request $request){
        $result= $this->kickBoxRepository->storeOrUpdate($request);
        // return to_route('kickbox.index')->with('success', $result['message']);
        return redirect()->route('admin.kickbox.index')->with('success',$result['message']);
    }

    public function kickboxEdit($id){
        $result = $this->kickBoxRepository->edit($id);
        return Inertia::render('Module/KickBox/Edit',[
            'result'=>$result
        ]);
    }

    public function kickboxUpdate(Request $request){
        $result = $this->kickBoxRepository->update($request);
        return redirect()->route('admin.kickbox.index')->with('success',$result['message']);
    }

    public function kickboxStatus (Request $request){
        $result = $this->kickBoxRepository->update($request);
        return back()->with('success',$result['message']);
    }

    public function kickboxDelete($id){
        DB::table('kickboxes')->where('id',$id)->delete();
        return back()->with('success', 'Kickbox Delete Successfully');
    }
}

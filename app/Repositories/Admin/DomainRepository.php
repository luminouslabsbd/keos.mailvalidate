<?php

namespace App\Repositories\Admin;
use Illuminate\Support\Facades\DB;
use App\Models\Admin\Domains;
use Illuminate\Support\Str;

class DomainRepository {
    protected $model;
    public function __construct(Domains $model)
    {
        $this->model=$model;
    }


    public function store($request, $id = null){
        $domain = Str::slug($request->domain, '-', null);
        $p_id = $domain.'-'.time();
        $data = $this->model::updateOrCreate(
            ['id' => $id],
            ['domain' => $request->domain,'user_name' => $request->user_name,'user_pass' => $request->user_pss, 'project_id' => $p_id,]
        );

        if ($data->wasRecentlyCreated) {
            $message = "Domain Created Successfully";
        } else {
            $message = "Domain Updated Successfully";
        }        return ['message' => $message,];
    }

    public function statusUpdate($request){
        DB::table('domains')->where('id',$request->id)->update([
            'status'=>$request->status
        ]);

        $message = "Domain status updated successfully";
        return ['message' => $message,];
    }
}
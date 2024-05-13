<?php

namespace App\Repositories\Admin;

use App\Models\Admin\Project;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ProjectRepository
{
    protected $model;
    public function __construct(Project $model)
    {
        $this->model = $model;
    }


    public function storeOrUpdate($request, $id = null)
    {
        // dd($request->all());
        $user = Auth::user();

        // Fetch existing data if updating
        $existingData = $this->model::find($id);


        // Get request data
        $projectName = $request->project ?? $existingData->project_name;
        $domainName = $request->domain ?? ($existingData ? $existingData->domain_name : null);
        $createdBy = $user->username;
        $code = $existingData->code ?? random_int(1000000000, 9999999999);
        $status = $request->status ?? 1;
        $kickBox_id = $request->kickbox_id ?? $existingData->kickbox_id;
        $data = $this->model::updateOrCreate(

            ['id' => $id],

            [
                'project_name' => $projectName,
                'domain_name' => $domainName,
                'created_by' => $createdBy,
                'code' => $code,
                'status' => $status,
                'kickbox_id' => $kickBox_id,
            ]
        );

        if ($data->wasRecentlyCreated) {
            $message = "Project Created Successfully";
        } else {
            $message = "Project Updated Successfully";
        }
        return ['message' => $message,];
    }

    public function edit(int $id){
        return $this->model::find($id);
    }

    public function update($request){
        return $this->storeOrUpdate($request,$request->id);
    }
}

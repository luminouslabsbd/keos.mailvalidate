<?php

namespace App\Repositories\Admin;

use App\Models\Admin\Kickbox;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class KickboxRepository
{
    protected $model;
    public function __construct(Kickbox $model)
    {
        $this->model = $model;
    }


    public function storeOrUpdate($request, $id = null)
    {

        $existingData = $this->model::find($id);

        $user = Auth::user();

        $name = $request->name ?? $existingData->name;
        $api_key = $request->api_key ?? $existingData->api_key;
        $createdBy = $user->username;
        $status = $request->status ?? 1;


        $data = $this->model::updateOrCreate(

            ['id' => $id],

            [
                'name' => $name,
                'created_by' => $createdBy,
                'status' => $status,
                'api_key' => $api_key,
            ]
        );



        if ($data->wasRecentlyCreated) {
            $message = "Api Created Successfully";
        } else {
            $message = "Api Updated Successfully";
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
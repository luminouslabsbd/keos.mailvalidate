<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $table = 'projects';
    protected $fillable = [
        'project_name',
        'domain_name',
        'domain_url',
        'created_by',
        'code',
        'kickbox_id',
        'status'
    ];
}

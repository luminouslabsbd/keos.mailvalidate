<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailListData extends Model
{
    use HasFactory;

    protected $table = 'email_lists_data';

    protected $fillable = [
        'project_id',
        'email',
        'system_status',
        'payload',
        'comments',
    ];

}

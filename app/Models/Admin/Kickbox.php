<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kickbox extends Model
{
    use HasFactory;

    protected $table = 'kickboxes';
    protected $fillable = [
        'name',
        'api_key',
        'status',
        'created_by',
    ];
}

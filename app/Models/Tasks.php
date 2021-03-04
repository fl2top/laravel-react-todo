<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    use HasFactory;

    private $id;

    private $body;

    private $title;

    private $userId;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['body', 'title', 'user_id'];
}

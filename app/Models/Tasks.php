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

    protected function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
    }

    public static function create(string $body, string $title, int $userId): Tasks
    {
        $task = new self([
            'body' => $body,
            'title' => $title,
            'user_id' => $userId,
        ]);

        $task->save();

        return $task;
    }
}

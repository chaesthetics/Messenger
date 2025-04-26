<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'firstname' => 'required|string|max:20|min:2',
            'lastname' => 'required|string|max:20|min:2',
            'email' => 'required|email|string|unique:users',
            'password' => 'required|string|min:6',
        ];
    }
    public function messages()
    {
        return [
            'firstname.required' => 'The name field is required.',
            'firstname.string' => 'The name field must be a string.',
            'firstname.max' => 'The name field must not exceed 255 characters.',
            'email.required' => 'The email field is required.',
            'email.email' => 'Please enter a valid email address.',
            'email.unique' => 'The email address is already in use.',
            'password.required' => 'The password field is required.',
            'password.string' => 'The password field must be a string.',
            'password.min' => 'The password must be at least 8 characters long.',
        ];
    }
}

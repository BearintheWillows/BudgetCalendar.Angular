namespace BudgetCalendar.Server.Data.Models.DTOs;


public class HttpResponseDto<T> where T : class
{
    public bool                 IsSuccess    { get; set; }
    public T?                   Data         { get; set; }
    public ICollection<string>? Errors       { get; set; }
    public string?              Message { get; set; }
    

    /// <summary>
    /// Constructor for a failed response with a single error
    /// </summary>
    /// <param name="isSuccess"></param>
    /// <param name="message"></param>
    public HttpResponseDto(bool isSuccess, string message)
    {
        IsSuccess = isSuccess;
        Message = message;
    }
    
    /// <summary>
    /// Constructor for a failed response with multiple errors
    /// </summary>
    /// <param name="isSuccess"></param>
    /// <param name="errors"></param>
    public HttpResponseDto(bool isSuccess, ICollection<string>? errors)
    {
        IsSuccess = isSuccess;
        Errors = errors;
    }
    
    /// <summary>
    /// Constructor for a successful response
    /// </summary>
    /// <param name="isSuccess"></param>
    /// <param name="data"></param>
    /// <param name="message">Optional</param>
    public HttpResponseDto(bool isSuccess, T data, string? message)
    {
        IsSuccess = isSuccess;
        Data = data;
        Message = message;
    }
    


}

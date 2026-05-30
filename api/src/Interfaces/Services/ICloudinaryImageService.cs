using System;
using CloudinaryDotNet.Actions;

namespace api.src.Interfaces;

public interface ICloudinaryImageService
{
    Task<ImageUploadResult> UploadPhotoAsync(IFormFile file, int height, int width, string crop);
    Task<DeletionResult> DeletePhotoAsync(string publicId);
}

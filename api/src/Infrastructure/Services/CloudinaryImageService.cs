using api.src.Exceptions;
using api.src.Infrastructure.Settings;
using api.src.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace api.src.Infrastructure.Services;

public class CloudinaryImageService : ICloudinaryImageService
{
    private readonly Cloudinary _cloudinary;

    public CloudinaryImageService(IOptions<CloudinarySettings> config)
    {
        var account = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);
        _cloudinary = new Cloudinary(account);
    }

    public async Task<DeletionResult> DeletePhotoAsync(string publicId)
    {
        var deleteParams = new DeletionParams(publicId);
        return await _cloudinary.DestroyAsync(deleteParams);
    }

    public async Task<ImageUploadResult> UploadPhotoAsync(IFormFile file, int height, int width, string crop = "fill")
    {
        if (file.Length <= 0)
        {
            throw new AppError("No se puede subir la imagen ingresada", 400);
        }

        await using var stream = file.OpenReadStream();
        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            Transformation = new Transformation().Height(height).Width(width).Crop(crop),
            Folder = "home-assistant"
        };

        return await _cloudinary.UploadAsync(uploadParams);
    }
}
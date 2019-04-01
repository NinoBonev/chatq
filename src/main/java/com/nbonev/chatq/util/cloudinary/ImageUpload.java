package com.nbonev.chatq.util.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.Map;

/**
 * Created by Nino Bonev - 24.3.2019 г., 9:24
 */


public class ImageUpload {

    private Cloudinary cloudinary;

    @Value("${app.cloud_name}")
    private String cloud_name;

    @Value("${app.api_key}")
    private String api_key;

    @Value("${app.api_secret}")
    private String api_secret;

    public ImageUpload() {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dar4inn2i",
                "api_key", "287582975438516",
                "api_secret", "wQ6E2D6mTcDg4D8T8GyC2w8rzlo"));
    }

    public String uploadAndSetStoryLine(String image) throws IOException {
        Transformation transformation = new Transformation()
                .width(2048)
                .quality("auto:eco");
        Map uploadResult = this.cloudinary.uploader().upload(image, ObjectUtils.asMap(
                "transformation", transformation));

        return (String) uploadResult.get("url");
    }

    public String uploadAndGetUrl(Double aspectRatio, String image) throws IOException {
        Transformation transformation = new Transformation()
                .aspectRatio(aspectRatio)
                .width(2048)
                .gravity("center")
                .quality("auto:eco")
                .crop("crop");
        Map uploadResult = this.cloudinary.uploader().upload(image, ObjectUtils.asMap(
                "transformation", transformation));

        return (String) uploadResult.get("url");
    }

    public String uploadWithTransformationAndGetUrl(String aspectRatio, String image, Double x, Double y, Double height, Double width) throws IOException {
        Transformation transformation = new Transformation()
                .gravity("custom")
                .aspectRatio(aspectRatio)
                .quality("auto:eco")
                .x(x.intValue() * 10)
                .y(y.intValue() * 10)
                .width(width.intValue())
                .height(height.intValue())
                .crop("crop");

        Map uploadResult = this.cloudinary.uploader().upload(image, ObjectUtils.asMap(
                "transformation", transformation));

        return (String) uploadResult.get("url");
    }
}

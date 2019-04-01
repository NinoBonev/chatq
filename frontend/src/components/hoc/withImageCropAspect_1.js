/**
 * Created by NinoB on 16.3.2019 г.
 */

import React from 'react';
import * as loadImage from 'blueimp-load-image';

function withImageCropAspect_1(WrappedComponent) {
    class ImageCrop extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                cover: '',
                croppedImageUrl: '',
                file: '',
                src: null,
                crop: {
                    aspect: 1,
                },
                loading: false,
            };
        }

        setFile = (file) => {

            this.setState({
                cover: file,
                src: file.base64
            });
        };


        onImageLoaded = (image, pixelCrop) => {
            this.imageRef = loadImage(image, (img) => {
                this.setState({
                    file: img
                });
            }, {orientation: true});
        };


        onCropComplete = (crop, pixelCrop) => {

            this.makeClientCrop(crop, pixelCrop);
        };

        onCropChange = crop => {
            this.setState({crop});
        };

        async makeClientCrop(crop, pixelCrop) {
            if (this.state.file && crop.width && crop.height) {
                const croppedImageUrl = await this.getCroppedImg(
                    this.state.file,
                    pixelCrop,
                    'newFile.jpeg',
                );

                this.setState({croppedImageUrl});
            }
        }


        getCroppedImg(image, pixelCrop, fileName) {
            const canvas = document.createElement('canvas');
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                1024,
                1024,
            );

            return new Promise((resolve, reject) => {
                canvas.toBlob(blob => {
                    if (!blob) {
                        //reject(new Error('Canvas is empty'));
                        console.error('Canvas is empty');
                        return;
                    }
                    blob.name = fileName;
                    window.URL.revokeObjectURL(this.fileUrl);
                    this.fileUrl = window.URL.createObjectURL(blob);
                    resolve(this.fileUrl);
                }, 'image/jpeg');
            });
        }

        render() {
            const {...otherProps} = this.props;
            return (<WrappedComponent
                setFile={this.setFile.bind(this)}
                onImageLoaded={this.onImageLoaded.bind(this)}
                onCropComplete={this.onCropComplete.bind(this)}
                onCropChange={this.onCropChange.bind(this)}
                makeClientCrop={this.makeClientCrop.bind(this)}
                getCroppedImg={this.getCroppedImg.bind(this)}
                {...otherProps}
                {...this.state}
            />);
        }
    }

    return ImageCrop;
}

export default withImageCropAspect_1;
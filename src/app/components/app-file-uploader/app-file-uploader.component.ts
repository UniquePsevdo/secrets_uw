import { Component, EventEmitter } from '@angular/core';
import { UploaderOptions, UploadFile, UploadInput, UploadOutput, humanizeBytes } from 'ngx-uploader';

@Component({
    selector: 'app-file-uploader',
    templateUrl: 'app-file-uploader.component.html',
    styleUrls: ['app-file-uploader.component.scss']
})
export class FileUploaderComponent {
    options: UploaderOptions;
    formData: FormData;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;

    constructor() {
        this.options = { concurrency: 1, allowedContentTypes: ['image/png', 'image/jpeg', 'image/gif'] };
        this.files = [];
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
    }

    onUploadOutput(output: UploadOutput): void {
        if (output.type === 'allAddedToQueue') { // when all files added in queue
            // uncomment this if you want to auto upload files when added
            // const event: UploadInput = {
            //   type: 'uploadAll',
            //   url: '/upload',
            //   method: 'POST',
            //   data: { foo: 'bar' }
            // };
            // this.uploadInput.emit(event);
        } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
            this.files.push(output.file);
        } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
            // update current data in files array for uploading file
            const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
            this.files[index] = output.file;
        } else if (output.type === 'removed') {
            // remove file from array when removed
            this.files = this.files.filter((file: UploadFile) => file !== output.file);
        } else if (output.type === 'dragOver') {
            this.dragOver = true;
        } else if (output.type === 'dragOut') {
            this.dragOver = false;
        } else if (output.type === 'drop') {
            this.dragOver = false;
        } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
            console.log(output.file.name + ' rejected');
        }
    }

    startUpload(): void {
        const event: UploadInput = {
            type: 'uploadAll',
            url: 'http://ngx-uploader.com/upload',
            method: 'POST',
            data: { foo: 'bar' }
        };

        this.uploadInput.emit(event);
    }

    cancelUpload(id: string): void {
        this.uploadInput.emit({ type: 'cancel', id: id });
    }

    removeFile(id: string): void {
        this.uploadInput.emit({ type: 'remove', id: id });
    }

    removeAllFiles(): void {
        this.uploadInput.emit({ type: 'removeAll' });
    }

}

import {HTTP} from "@ionic-native/http/ngx";
import {NativeStorage} from "@ionic-native/native-storage/ngx";

export class NativeStorageMock extends NativeStorage {

    getItem(reference: string): Promise<any> {
        return new Promise((resolve) => {
            resolve('retrieved');
        });
    }

    setItem(reference: string): Promise<any> {
        return new Promise((resolve) => {
            resolve('set');
        });
    }

    clear(): Promise<any> {
        return new Promise((resolve) => {
            resolve('clear');
        });
    }
}

export class HTTPMock extends HTTP {

    setDataSerializer(serializer: string): void {}

    downloadFile(source, body, headers, filePath) : Promise<any> {
        return new Promise((resolve) => {
            resolve('downloaded');
        });
    }
}
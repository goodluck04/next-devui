import { bytesToMB } from "@/lib/utils";

export function imageValidator(name: string | undefined, size: number): string | null {
    let flag: string | null = null

    // custom validating  image

    // if ther is file
    if (name) {
        // checkking for file type
        // split will split the name based on . and return array
        const getImgExt = name.split(".")
        // type of file wi will accept
        const imagesExtType: Array<string> = ["svg", "png", "jpg", "jpeg", "gif"];
        // !include if these extesnsin aren't from the array
        if (!imagesExtType.includes(getImgExt[1])) {
            // if the above are not the extension type show this error
            flag = "image must be .png, .jpeg, .svg, .jpg or .gif";
        } else {
            // if extesion is valid then flag is null
            flag = null;
        }
    } else if(size) {
        // file type is correct now check for size
        const fileInMb = bytesToMB(size);
        if(fileInMb > 2) {
            flag = "Image should be less than 2mb";
        } else {
            flag = null;
        }
    }
    return flag;
}
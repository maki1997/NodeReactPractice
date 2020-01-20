export default class Logging {
    public static log(msg: string) {
        console.log(msg);
    }
    public static error(msg: string) {
        console.error(msg);
        //Maybe log into files...
    }
    public static warn(msg: string) {
        console.warn(msg);
    }
}

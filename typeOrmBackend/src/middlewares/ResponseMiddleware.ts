export default function(req: any, res: any, next: any) {
    res.success = (data: any = null, message: string = null) => {
        return res.status(200).json({ data, message, success: true });
    };

    res.error = (errorMessage: string, errorStack: string = null) => {
        console.log(errorStack);
        return res.status(500).json({ errorMessage, errorStack, success: false });
    };

    res.notFound = (errorMessage: string, data: any = null) => {
        return res.status(404).json({ errorMessage, data, success: false });
    };

    res.unauthorized = (data: any = null, errorMessage: string = null) => {
        return res.status(401).json({ data, errorMessage, success: false });
    };

    res.forbidden = (data: any = null, errorMessage: string = null) => {
        return res.status(403).json({ data, errorMessage, success: false });
    };

    res.returnFile = (file: any = null) => {
        return res.status(200).send(file);
    };

    next();
}

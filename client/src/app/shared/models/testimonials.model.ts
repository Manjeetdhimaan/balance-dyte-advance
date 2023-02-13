export class Testimonial {
    constructor(
        public clientName: string,
        public beforeImageSrc: string,
        public clientProfession: string,
        public reviewTitle: string,
        public reviewContent: string,
        public clientImageSrcObject: {
            beforeImageSrc: string,
            afterImageSrc: string
        }
    ) { }
}

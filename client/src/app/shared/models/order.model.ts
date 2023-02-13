export class Order {
    constructor(
        public _id: string,
        public razorPayOrderId: string,
        public createdAt: string,
        public updatedAt: string,
        public planDetails: {
            paymentStatus: string,
            payableTotal: string,
            planPrice: string,
            currency: string,
            planName: string,
            planDuration: string,
            goals: string,
            weight: string,
            height: string,
            loseOrGain: string,
            goingGym: string,
            physicallyActive: string,
            foodType: string,
            medicalIssue: string,
            foodAllergy: string
        },
        public user: {
            email: string,
            phone: string,
            userId: string
        }
    ) { }

}
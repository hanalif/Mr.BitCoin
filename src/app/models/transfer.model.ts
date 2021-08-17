export interface Transfer {
    _id: string,
    fromUserId: string,
    toContactId: string,
    toContactName: string,
    amount: number,
    date: Date
}
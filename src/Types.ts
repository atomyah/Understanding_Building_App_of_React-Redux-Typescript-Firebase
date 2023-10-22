export interface initalUserState {
    user: null | {
        uid: string,
        photo: string,
        email: string,
        displayName: string,
    }
}

export interface initalChannelState {
    channelId: string | null,
    channelName: string | null,
}
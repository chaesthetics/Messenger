import { UserType } from './user';

// export type Chat = {
//     id: number;
//     conversation_id: number;
//     sender_id: number;
//     content: string;
//     created_at: string | null;
//     updated_at: string | null;
//     user: UserType;
// };

export type ChatType = {
    id: number;
    sender_id: number;
    receiver_id: number;
    created_at: string | null;
    updated_at: string | null;
    chatwith?: UserType;
    lastMessage?: string;
};

export type ChatList = ChatType[];
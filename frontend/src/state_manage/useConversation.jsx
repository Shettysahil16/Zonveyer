import { create } from 'zustand'

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),

  conversations: [],
  setConversations: (data) => set({ conversations: data }),

  sortedUsersData : [],
  setSortedUsersData : (sortedUsersData) => set({sortedUsersData})
}))

export default useConversation;

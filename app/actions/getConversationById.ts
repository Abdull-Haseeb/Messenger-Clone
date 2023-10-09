import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationsById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser.email) {
      return null;
    }
    const conversations = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    return conversations;
  } catch (error: any) {
    console.log(error, "SERVER ERROR!");
    return null;
  }
};
export default getConversationsById;

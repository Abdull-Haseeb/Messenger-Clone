import bcrypt from "bcrypt"
import NextAuth,{AuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import PrismaAdapter from "@next-auth/prisma-adapter"
import Prisma from "@/app/libs/prismadb"

export const authOptions: AuthOptions = {
    adapter:PrismaAdapter(prisma),
    providers: [
        GithubProvider({
        client: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
            client: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
            email:{label:'email',type:'text'},
            password:{label:'password',type:'password'},
        },
        async authorize(credentials){
        if( !credentials?.email || !credentials?.password){
        
        throw new Error("Invalid Credentials")
        }
        }
    })
    ]
}

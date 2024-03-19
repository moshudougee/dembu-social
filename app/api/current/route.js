import serverAuth from "@/libs/serverAuth";

export async function GET() {
    try {
        const  {currentUser}  = await serverAuth();
        if(currentUser === null) {
            return new Response('Unauthorized', { status: 401});
        }
        return Response.json(currentUser);
    } catch (error) {
        console.log(error);
        return new Response('Internal server error, Get current user', { status: 500});
    }
}
export const MessageErr = {
    isNotValidID: (id: string) => ({ error: `this Id: ${id} is not valid` }),
    isNotUserID: (id: string) => ({ error: `there is no user with this id: ${id}` }),
    failed: (method: 'create' | 'update') => ({ error: `failed to ${method} user` }),
    notFound: { error: 'Not Found' },
    notID: { message: `id not specified` },
    urlExists: { message: 'this url does not exist' },
    balancer: { message: 'the load balancer accepts requests on port 4000' }
}

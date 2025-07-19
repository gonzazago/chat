export class RestClient {
    private readonly baseUrl: string;
    private readonly headers: Record<string, string>;

    constructor(baseUrl: string, headers: Record<string, string> = { 'Content-Type': 'application/json' }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    private async request<T>(method: string, url: string, body?: any): Promise<T> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method,
            headers: this.headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        return await response.json() as Promise<T>;
    }

    public get<T>(url: string): Promise<T> {
        return this.request<T>('GET', url);
    }

    public post<T>(url: string, data: any): Promise<T> {
        return this.request<T>('POST', url, data);
    }

    public put<T>(url: string, data: any): Promise<T> {
        return this.request<T>('PUT', url, data);
    }

    public delete<T>(url: string): Promise<T> {
        return this.request<T>('DELETE', url);
    }
}

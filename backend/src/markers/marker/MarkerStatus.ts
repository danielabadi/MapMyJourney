export class MarkerStatus {
    public readonly status: string;

    private constructor(status: string) {
        this.status = status;
    }

    private static isValid(status: string): boolean {
        return status != null;
    }

    public static create(status: string): MarkerStatus {
        if (MarkerStatus.isValid(status)) {
            return new MarkerStatus(status);
        }
        throw new Error('invalid status');
    }
}

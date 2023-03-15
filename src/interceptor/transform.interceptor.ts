import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    private static readonly TAG = TransformInterceptor.name;

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const req = context.getArgByIndex(1).request,
            d = new Date();

        d.setHours(d.getHours(), d.getMinutes() - d.getTimezoneOffset());

        return next.handle().pipe(
            map((data) => {
                if (req) {
                    const msg = [
                        `Time: ${d.toISOString()} | `,
                        `RequestUrl: ${req.url} | `,
                        `Method: ${req.method} | `,
                        `HostName: ${req.hostname} | `,
                        `Headers: ${req.Headers} | `,
                        `ResponseData: ${data} | `,
                    ].join('');
                    Logger.log(msg, TransformInterceptor.TAG);
                }
                return data;
            }),
        );
    }
}

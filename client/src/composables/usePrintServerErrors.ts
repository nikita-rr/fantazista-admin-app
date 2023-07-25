import { ElMessage } from 'element-plus';
import type { IServerError } from '~/interfaces/IServerError';

export function usePrintServerErrors() {
  function print(error: IServerError) {
    if (error.response && error.response.data) {
      if (Array.isArray(error.response.data.message)) {
        return _printArray(error.response.data.message as string[]);
      } else if (typeof error.response.data.message === 'string') {
        return _printSingle(error.response.data.message);
      }
    }
    console.error(error);
  }

  function _printArray(errors: string[]) {
    let i = 0;
    for (const error of errors) {
      setTimeout(() => {
        ElMessage({
          type: 'error',
          message: error,
        });
      }, i * 500);
      i++;
    }
  }

  function _printSingle(error: string) {
    ElMessage({
      type: 'error',
      message: error,
    });
  }

  return { print };
}

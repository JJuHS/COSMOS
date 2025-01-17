import axios from 'axios';
import useAuthStore from '../store/auth';

// Axios 인스턴스 설정
const api = axios.create({
    baseURL: '', // 기본 URL 설정
    timeout: 10000, // 요청 타임아웃 시간 설정
    headers: { 'Content-Type': 'application/json' }, // 기본 헤더 설정
});

// Axios 응답 인터셉터 설정
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { response } = error; // error 객체에서 response를 추출

        if (response && response.status === 401) { // 응답이 있고, 상태 코드가 401(권한 없음)일 경우
            const errorData = response.data.error;
            if (errorData?.accessToken === "Expired JWT token") {
                try {
                    const { getRefreshToken, reissuanceAccessToken } = useAuthStore.getState();
                    const refreshToken = getRefreshToken();
                    const accessToken = await reissuanceAccessToken({ refreshToken });

                    if (accessToken) {
                        error.config.headers['Authorization'] = `Bearer ${accessToken}`;
                        return api(error.config); // 원래 요청을 다시 시도하여 새로운 액세스 토큰으로 API 요청을 재시도
                    }
                } catch (error) {
                    return Promise.reject(error); // 토큰 재발급 오류를 반환
                }
            }
        }

        return Promise.reject(error); // 다른 오류는 그대로 반환
    }
);

// GET 요청
export const get = async (url, params = {}, headers = {}) => {
    const response = await api.get(url, { params, headers: { ...api.defaults.headers, ...headers } });
    return response.data;
};

// POST 요청
export const post = async (url, data = {}, headers = {}) => {
    const response = await api.post(url, data, { headers: { ...api.defaults.headers, ...headers } });
    return response.data;
};

// PATCH 요청
export const patch = async (url, data = {}, headers = {}) => {
    const response = await api.patch(url, data, { headers: { ...api.defaults.headers, ...headers } });
    return response.data;
};

// DELETE 요청
export const deleteRequest = async (url, params = {}, headers = {}) => {
    const response = await api.delete(url, { params, headers: { ...api.defaults.headers, ...headers } });
    return response.data;
};

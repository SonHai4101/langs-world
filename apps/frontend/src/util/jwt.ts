import useAuthStore from "@/store/useAuthStore";
import { jwtDecode } from "jwt-decode";

function autoClearExpiredToken() {
  const token = useAuthStore((state) => state.accessToken);
  const { clearAuth } = useAuthStore();
  if (!token) return;
  if (token) {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp ? decoded.exp * 1000 < Date.now() : true;
    if (isExpired) {
      clearAuth();
    }
  }
}

autoClearExpiredToken();
setInterval(autoClearExpiredToken, 60 * 1000);

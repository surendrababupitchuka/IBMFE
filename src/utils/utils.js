import Cookies from 'universal-cookie';
export const cookies = new Cookies();

export const removeAllCookies = () =>{
    cookies.remove("login");
    cookies.remove("USR_VLE");
    cookies.remove('RST_VL');
}
// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoIconDark from 'assets/images/logo-icon-dark.svg';
 * import logoIcon from 'assets/images/logo-icon.svg';
 * import { ThemeMode } from 'config';
 *
 */

// ==============================|| LOGO ICON SVG ||============================== //

export default function LogoIcon() {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={theme.palette.mode === ThemeMode.DARK ? logoIconDark : logoIcon} alt="Mantis" width="100" />
     *
     */
    <svg width="129" height="129" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Group_1410" data-name="Group 1410" transform="translate(-701.243 -27.066)">
        <path
          id="Path_7236"
          data-name="Path 7236"
          d="M490.508,250.723a202.492,202.492,0,0,1,33.074.64c38.362,3.864,76.935,10.4,102.108,35.793,31.859,32.133,41.469,87.725,37.4,136.142Z"
          transform="translate(210.736 -223.239)"
          fill="#897cf4"
        />
        <path
          id="Path_7235"
          data-name="Path 7235"
          d="M747.348,265.8l-21.079.452c-5.068.107-17.112,1.048-22.315,2.128C681.9,272.1,656.929,281.435,637.5,299.773c-23.421,22.11-120.354,126.8-142.028,132.337-1.059,1.231,7.836,1.844,7.836,1.844l51.223-1.016a142.806,142.806,0,0,0,20.068-1.962c22.046-3.719,40.8-12.893,60.242-31.24,23.427-22.11,94.11-95.555,94.11-95.555a121.918,121.918,0,0,1,59.156-37.056c2.838-.763,1.774-2.08,1.774-2.08Z"
          transform="translate(232.067 -158.764)"
          fill="#39398e"
        />
      </g>
      <defs>
        <linearGradient id="paint0_linear" x1="25.0225" y1="49.3259" x2="11.4189" y2="62.9295" gradientUnits="userSpaceOnUse">
          <stop stopColor={theme.palette.primary.darker} />
          <stop offset="0.9637" stopColor={theme.palette.primary.dark} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paint1_linear" x1="103.5" y1="49.5" x2="114.5" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor={theme.palette.primary.darker} />
          <stop offset="1" stopColor={theme.palette.primary.dark} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

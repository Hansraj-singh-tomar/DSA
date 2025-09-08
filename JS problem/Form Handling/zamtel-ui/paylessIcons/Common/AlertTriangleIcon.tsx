import { SVGProps } from "react"

interface IProps {
  svgProps: SVGProps<SVGSVGElement>
  stroke?: string
  fill?: string
}

function AlertTriangleIcon({ svgProps, stroke, fill }: IProps) {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <g id="alert-triangle">
        <path
          id="Vector"
          d="M9.00008 7.24991V10.2499M9.00008 13.2499H9.00758M7.71758 3.39491L1.36508 13.9999C1.2341 14.2267 1.1648 14.4839 1.16407 14.7458C1.16334 15.0077 1.23119 15.2653 1.3609 15.4928C1.4906 15.7204 1.67762 15.91 1.90336 16.0428C2.12909 16.1756 2.38568 16.247 2.64758 16.2499H15.3526C15.6145 16.247 15.8711 16.1756 16.0968 16.0428C16.3225 15.91 16.5096 15.7204 16.6393 15.4928C16.769 15.2653 16.8368 15.0077 16.8361 14.7458C16.8354 14.4839 16.7661 14.2267 16.6351 13.9999L10.2826 3.39491C10.1489 3.17449 9.96062 2.99225 9.73597 2.86577C9.51133 2.7393 9.25788 2.67285 9.00008 2.67285C8.74228 2.67285 8.48882 2.7393 8.26418 2.86577C8.03954 2.99225 7.85128 3.17449 7.71758 3.39491Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

AlertTriangleIcon.defaultProps = {
  stroke: "#4D74EF",
  fill: "none",
}

export default AlertTriangleIcon

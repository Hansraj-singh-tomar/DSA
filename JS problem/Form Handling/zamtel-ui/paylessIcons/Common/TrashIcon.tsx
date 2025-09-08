import { SVGProps } from "react"

interface IProps {
  svgProps: SVGProps<SVGSVGElement>
  stroke?: string
  fill?: string
}

function TrashIcon({ svgProps, stroke, fill }: IProps) {
  return (
    <svg
      id="trash"
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      {...svgProps}
    >
      <path
        id="Vector"
        d="M12.452.379A64.266,64.266,0,0,0,5.52,0,37.327,37.327,0,0,0,1.411.227L0,.379"
        transform="translate(2.274 3.876)"
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
      <path
        id="Vector-2"
        data-name="Vector"
        d="M0,2.251l.167-.993C.288.538.379,0,1.66,0H3.646c1.281,0,1.38.568,1.493,1.266l.167.985"
        transform="translate(5.847 1.516)"
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
      <path
        id="Vector-3"
        data-name="Vector"
        d="M9.193,0,8.757,7.633c-.074,1.19-.134,2.115-2.006,2.115H2.442C.57,9.748.51,8.823.436,7.633L0,0"
        transform="translate(3.904 5.736)"
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
      <path
        id="Vector-4"
        data-name="Vector"
        d="M0,0H2.524"
        transform="translate(7.234 11.688)"
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
      <path
        id="Vector-5"
        data-name="Vector"
        d="M0,0H3.79"
        transform="translate(6.605 8.854)"
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
      <path
        id="Vector-6"
        data-name="Vector"
        d="M0,0H17V17H0Z"
        fill={fill}
        opacity="0"
      />
    </svg>
  )
}

TrashIcon.defaultProps = {
  stroke: "#666",
  fill: "none",
}

export default TrashIcon

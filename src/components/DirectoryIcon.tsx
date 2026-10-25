
import { Show } from "solid-js";

type IconType = "ou" | "user" | "computer" | "group";

interface DirectoryIconProps {
  type: IconType;
  size?: number;
}

export default function DirectoryIcon(props: DirectoryIconProps) {
  const size = () => props.size ?? 16;

  return (
    <svg
      width={size()}
      height={size()}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ "flex-shrink": "0" }}
    >
      <Show when={props.type === "ou"}>
        <path
          d="M2.5 6.5V19H21.5V7.5H11L8.5 4.5H2.5V6.5Z"
          fill="#E8B849"
          stroke="#A77C26"
          stroke-width="1"
          stroke-linejoin="round"
        />
        <path
          d="M3 9H21L19.5 19H3Z"
          fill="#F7D778"
          stroke="#C79A37"
          stroke-width=".7"
        />
      </Show>

      <Show when={props.type === "user"}>
        <circle
          cx="12"
          cy="7"
          r="4"
          fill="#7DA8D6"
          stroke="#426B99"
        />
        <path
          d="M4 20V18C4 14 7 12.5 12 12.5S20 14 20 18V20Z"
          fill="#76A4D1"
          stroke="#426B99"
        />
      </Show>

      <Show when={props.type === "computer"}>
        <rect
          x="2"
          y="3"
          width="20"
          height="14"
          rx="1"
          fill="#BFD8ED"
          stroke="#527A9B"
        />
        <rect
          x="4"
          y="5"
          width="16"
          height="10"
          fill="#4586B5"
        />
        <path
          d="M12 17V21M7 21H17"
          stroke="#777"
          stroke-width="2"
          stroke-linecap="round"
        />
      </Show>

      <Show when={props.type === "group"}>
        <circle cx="9" cy="7" r="3" fill="#6C9FCD" />
        <circle cx="17" cy="8" r="2.5" fill="#9CB9D6" />
        <path
          d="M2 19C2 14 5 12 9 12C13 12 16 14 16 19Z"
          fill="#6C9FCD"
          stroke="#4779A7"
        />
        <path
          d="M16 13C20 13 22 15 22 19H17"
          fill="#9CB9D6"
          stroke="#7193B5"
        />
      </Show>
    </svg>
  );
}

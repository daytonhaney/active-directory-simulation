import { For, Show, createSignal } from "solid-js";
import { menus, type MenuItem } from "../config/menu";

type MenuBarProps = {
  onAction?: (action: string) => void;
};

function MenuEntries(props: {
  items: MenuItem[];
  onAction: (action: string) => void;
}) {
  return (
    <For each={props.items}>
      {(item) => (
        <Show when={!item.separator} fallback={<div class="menu-separator" />}>
          <Show
            when={item.children}
            fallback={
              <button
                class="menu-item"
                disabled={item.disabled}
                onClick={() => {
                  if (item.action) props.onAction(item.action);
                }}
              >
                {item.label}
              </button>
            }
          >
            <div class="submenu-container">
              <button class="menu-item submenu-trigger">
                {item.label}
                <span>▸</span>
              </button>

              <div class="submenu-dropdown">
                <MenuEntries
                  items={item.children ?? []}
                  onAction={props.onAction}
                />
              </div>
            </div>
          </Show>
        </Show>
      )}
    </For>
  );
}

export default function MenuBar(props: MenuBarProps) {
  const [openMenu, setOpenMenu] = createSignal<string | null>(null);

  const handleAction = (action: string) => {
    setOpenMenu(null);
    props.onAction?.(action);
  };

  return (
    <div class="menubar">
      <For each={menus}>
        {(menu) => (
          <div class="menu-container">
            <button
              class="menu-button"
              classList={{ active: openMenu() === menu.name }}
              aria-expanded={openMenu() === menu.name}
              aria-haspopup="menu"
              onClick={() =>
                setOpenMenu(openMenu() === menu.name ? null : menu.name)
              }
            >
              {menu.name}
            </button>

            <Show when={openMenu() === menu.name}>
              <div class="menu-dropdown">
                <MenuEntries items={menu.items} onAction={handleAction} />
              </div>
            </Show>
          </div>
        )}
      </For>
    </div>
  );
}

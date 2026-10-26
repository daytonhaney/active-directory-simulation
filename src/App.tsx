import "./App.css";
import { createEffect } from "solid-js";
import { createSignal, For, Show } from "solid-js";
import MenuBar from "./components/MenuBar";
import MenuBarIcons from "./components/MenuBarIcons";
import { ActiveDirectoryIcon } from "./components/DirectoryIcons";
import DirectoryIcon from "./components/DirectoryIcons";

type DirectoryObject = {
  name: string;
  type: "ou" | "user" | "computer" | "group";
  description?: string;
  children?: DirectoryObject[];
};

const directory: DirectoryObject = {
  name: "bindows.local",
  type: "ou",
  children: [
    { name: "Builtin", type: "ou", children: [] },
    { name: "Computers", type: "ou", children: [] },
    { name: "Domain Controllers", type: "ou", children: [] },
    {
      name: "Bindows",
      type: "ou",
      children: [
        {
          name: "Computers",
          type: "ou",
          children: [
            { name: "FS01", type: "computer" },
            {
              name: "Workstations",
              type: "ou",
              children: [],
            },
          ],
        },
        { name: "Contractors", type: "ou", children: [] },
        { name: "Disabled Users", type: "ou", children: [] },
        { name: "Groups", type: "ou", children: [] },
        {
          name: "Users",
          type: "ou",
          children: [
            { name: "Finance", type: "ou", children: [] },
            { name: "HR", type: "ou", children: [] },
            { name: "IT", type: "ou", children: [] },
            { name: "Operations", type: "ou", children: [] },
            { name: "Sales", type: "ou", children: [] },
          ],
        },
      ],
    },
    { name: "Users", type: "ou", children: [] },
  ],
};

function TreeNode(props: {
  node: DirectoryObject;
  path: string;
  selected: string;
  onSelect: (path: string) => void;
}) {
  const [expanded, setExpanded] = createSignal(true);

  const currentPath = () =>
    props.path ? `${props.path}/${props.node.name}` : props.node.name;
  const hasChildren = () => (props.node.children?.length ?? 0) > 0;

  return (
    <div>
      <div
        class={`tree-node ${props.selected === currentPath() ? "selected" : ""}`}
        onClick={() => props.onSelect(currentPath())}
      >
        <span
          class="arrow"
          onClick={(event) => {
            event.stopPropagation();
            setExpanded(!expanded());
          }}
        >
          {hasChildren() ? (expanded() ? "▾" : "▸") : ""}
        </span>
        <DirectoryIcon type="ou" />
        <span>{props.node.name}</span>
      </div>

      <Show when={expanded() && hasChildren()}>
        <div class="tree-children">
          <For each={props.node.children}>
            {(child) => (
              <Show when={child.type === "ou"}>
                <TreeNode
                  node={child}
                  path={currentPath()}
                  selected={props.selected}
                  onSelect={props.onSelect}
                />
              </Show>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}

function findNode(
  node: DirectoryObject,
  parts: string[],
): DirectoryObject | undefined {
  if (parts.length === 0) return node;

  const child = node.children?.find((item) => item.name === parts[0]);
  return child ? findNode(child, parts.slice(1)) : undefined;
}

export default function App() {
  const [selectedObject, setSelectedObject] = createSignal<string | null>(null);
  const [panelWidth, setPanelWidth] = createSignal(310);
  const [selected, setSelected] = createSignal(directory.name);

  createEffect(() => {
    console.log("Selected path:", selected());
    console.log("Selected path:", selectedNode());
  });

  const selectedNode = () => {
    const parts = selected().split("/");
    if (parts[0] !== directory.name) return undefined;
    return findNode(directory, parts.slice(1));
  };

  return (
    <div class="app-window">
      <div class="titlebar">
        <ActiveDirectoryIcon />
        <span>Active Directory Users and Computers</span>
      </div>

      <MenuBar
        onAction={(action) => {
          console.log("Menu action:", action);
        }}
      />

      <MenuBarIcons />
      <div class="panes">
        <aside class="tree-pane" style={{ width: `${panelWidth()}px` }}>
          <div class="console-root">
            <ActiveDirectoryIcon />
            <span>
              Active Directory Users and Computers [DC01.bindows.local]
            </span>
          </div>
          <div class="console-root">📁 Saved Queries</div>
          <TreeNode
            node={directory}
            path=""
            selected={selected()}
            onSelect={(path) => {
              setSelected(path);
              setSelectedObject(null);
            }}
          />
        </aside>
        <div
          class="pane-divider"
          onPointerDown={(event) => {
            const divider = event.currentTarget;
            divider.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

            const container = event.currentTarget.parentElement;
            if (!container) return;

            const left = container.getBoundingClientRect().left;
            const maxWidth = Math.max(180, container.clientWidth - 180);
            const newWidth = Math.max(
              180,
              Math.min(event.clientX - left, maxWidth),
            );

            setPanelWidth(newWidth);
          }}
          onPointerUp={(event) => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
        />
        <main class="list-pane">
          <div class="details-header">
            <div>Name</div>
            <div>Type</div>
            <div>Description</div>
          </div>

          <For each={selectedNode()?.children ?? []}>
            {(item) => (
              <div
                class={`details-row ${
                  selectedObject() === item.name ? "selected" : ""
                }`}
                onClick={() => setSelectedObject(item.name)}
              >
                <div class="details-name">
                  <DirectoryIcon type={item.type} />
                  <span>{item.name}</span>
                </div>

                <div>
                  {item.type === "ou"
                    ? "Organizational Unit"
                    : item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </div>

                <div>{item.description ?? ""}</div>
              </div>
            )}
          </For>
        </main>
      </div>

      <div class="statusbar">
        {selectedNode()?.children?.length ?? 0} object(s)
      </div>
    </div>
  );
}

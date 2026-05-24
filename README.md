# TOML Reader Action

[English](#english) | [中文](#chinese)

---

<a id="english"></a>

## English

A GitHub Action that reads specified fields from a TOML file and exposes each field as an individual output.

> **Note:** The `file` path is relative to the repository root (`GITHUB_WORKSPACE`).

### Inputs

| Name     | Description                                      | Required | Default |
|----------|--------------------------------------------------|----------|---------|
| `file`   | Path to the TOML file to read                    | Yes      | —       |
| `fields` | Dot-separated field paths to extract (multiline) | Yes      | —       |
| `split`  | Character to replace `.` with in output names    | No       | `_`     |
| `debug`  | Enable debug logging (`true` / `false`)          | No       | `false` |

### Outputs

Each field specified in `fields` becomes its own output. The output key is the field path with `.` replaced by the
`split` character.

For example, `package.name` → output `package_name`, `dependencies.foo` → output `dependencies_foo`.

### Example

Given a TOML file `config.toml`:

```toml
[package]
name = "my-project"
version = "1.0.0"

[dependencies]
foo = "2.0"
bar = "3.0"
```

```yaml
- name: Read TOML
  id: toml
  uses: Gu-ZT/toml-reader-action@main
  with:
    file: config.toml
    fields: |
      package.name
      package.version
      dependencies.foo
      dependencies.bar

- name: Use values
  run: |
    echo "Package Name: ${{ steps.toml.outputs.package_name }}"
    echo "Package Version: ${{ steps.toml.outputs.package_version }}"
    echo "Dependency Foo: ${{ steps.toml.outputs.dependencies_foo }}"
    echo "Dependency Bar: ${{ steps.toml.outputs.dependencies_bar }}"
```

### License

MIT

---

<a id="chinese"></a>

## 中文

一个从 TOML 文件中读取指定字段，并将每个字段暴露为独立输出的 GitHub Action。

> **注意：** `file` 路径相对于仓库根目录（`GITHUB_WORKSPACE`）。

### 输入

| 名称       | 描述                       | 必填 | 默认值     |
|----------|--------------------------|----|---------|
| `file`   | 要读取的 TOML 文件路径           | 是  | —       |
| `fields` | 要提取的字段路径，以点号分隔（多行输入）     | 是  | —       |
| `split`  | 用于替换输出名称中 `.` 的字符        | 否  | `_`     |
| `debug`  | 启用调试日志（`true` / `false`） | 否  | `false` |

### 输出

每个在 `fields` 中指定的字段都会成为一个独立的输出。输出键名为字段路径中的 `.` 替换为 `split` 字符后的结果。

例如：`package.name` → 输出 `package_name`，`dependencies.foo` → 输出 `dependencies_foo`。

### 示例

假设存在 `config.toml` 文件：

```toml
[package]
name = "my-project"
version = "1.0.0"

[dependencies]
foo = "2.0"
bar = "3.0"
```

```yaml
- name: 读取 TOML
  id: toml
  uses: Gu-ZT/toml-reader-action@main
  with:
    file: config.toml
    fields: |
      package.name
      package.version
      dependencies.foo
      dependencies.bar

- name: 使用读取的值
  run: |
    echo "包名: ${{ steps.toml.outputs.package_name }}"
    echo "版本: ${{ steps.toml.outputs.package_version }}"
    echo "依赖 Foo: ${{ steps.toml.outputs.dependencies_foo }}"
    echo "依赖 Bar: ${{ steps.toml.outputs.dependencies_bar }}"
```

### 许可证

MIT

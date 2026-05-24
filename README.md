# TOML Reader Action

[English](#english) | [中文](#chinese)

---

<a id="english"></a>

## English

A GitHub Action that reads a value from a TOML file and exposes it as an output.

### Inputs

| Name     | Description                                      | Required |
|----------|--------------------------------------------------|----------|
| `file`   | Path to the TOML file to read                    | Yes      |
| `fields` | Dot-separated field paths to extract (multiline) | Yes      |

### Outputs

| Name    | Description                         |
|---------|-------------------------------------|
| `value` | The extracted data as a JSON object |

### Example

Given a TOML file `config.toml`:

```toml
[package]
name = "my-project"
version = "1.0.0"

[dependencies]
foo = "2.0"
```

```yaml
- name: Read TOML
  id: toml
  uses: your-org/toml-reader-action@v1
  with:
    file: config.toml
    fields: |
      package.name
      package.version

- name: Use values
  run: |
    echo "Name: ${{ fromJSON(steps.toml.outputs.value).package.name }}"
    echo "Version: ${{ fromJSON(steps.toml.outputs.value).package.version }}"
```

### License

MIT

---

<a id="chinese"></a>

## 中文

一个从 TOML 文件中读取指定字段并暴露为输出的 GitHub Action。

### 输入

| 名称       | 描述                   | 必填 |
|----------|----------------------|----|
| `file`   | 要读取的 TOML 文件路径       | 是  |
| `fields` | 要提取的字段路径，以点号分隔（多行输入） | 是  |

### 输出

| 名称      | 描述                  |
|---------|---------------------|
| `value` | 提取的数据，以 JSON 对象形式输出 |

### 示例

假设存在 `config.toml` 文件：

```toml
[package]
name = "my-project"
version = "1.0.0"

[dependencies]
foo = "2.0"
```

```yaml
- name: 读取 TOML
  id: toml
  uses: your-org/toml-reader-action@v1
  with:
    file: config.toml
    fields: |
      package.name
      package.version

- name: 使用读取的值
  run: |
    echo "名称: ${{ fromJSON(steps.toml.outputs.value).package.name }}"
    echo "版本: ${{ fromJSON(steps.toml.outputs.value).package.version }}"
```

### 许可证

MIT

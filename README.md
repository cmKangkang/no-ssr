# no-ssr

no-ssr 是一个基于react的服务端渲染组件，可将其包裹的组件延迟至客户端加载，避免因服务端与客户端渲染结果不一致引发的问题。



## 使用

```typescript
import { ClassNoSSR, HooksNoSSR } from "no-ssr"

// with hooks
<HooksNoSSR>
	<Comp /> // 需要延迟到客户端渲染的组件
</HooksNoSSR>

// with class component
<ClassNoSSR onSSR={<Loading />}>
	<Comp />	// 需要延迟到客户端渲染的组件
</ClassNoSSR>

```



### 示例

```typescript
import { ClassNoSSR, HooksNoSSR } from "no-ssr"

const Loading = () => <div>loading</div>

const Demo: NextPage = () => {
  return (
    <div className={styles.container}>
        <HooksNoSSR>
          <Comp />
        </HooksNoSSR>
        <ClassNoSSR onSSR={<Loading />}>
          <Comp />
        </ClassNoSSR>
     </div>
  );
}
```





## api

| 属性     | 说明                             | 类型                   | 默认值 |
| -------- | -------------------------------- | ---------------------- | ------ |
| children | 需要延迟到客户端渲染的组件或元素 | ReactNode \| undefined | -      |
| onSRR    | 服务端渲染骨架                   | ReactNode \| undefiend | -      |


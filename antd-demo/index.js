import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;
class Demo extends Component {
    state = {
        treeData: [
            {
                title: 'Expand to load00', key: '0',
                children: [
                    { title: '00-0', key: '00-0' },
                    { title: '00-1', key: '00-1' },
                    { title: '00-2', key: '00-2' },
                ]
            },
            { title: 'Expand to load01', key: '1' },
            { title: 'Expand to load02', key: '2' },
            { title: 'Expand to load03', key: '3' },
            { title: 'Tree Node04', key: '4', isLeaf: true },
            { title: 'Tree Node05', key: '5', isLeaf: true },
        ],
    }

    onLoadData = (treeNode) => {
        console.log('loadData异步加载。。。。', treeNode);
        return new Promise((resolve) => {
            if (treeNode.props.children) {
                resolve();
                return;
            }
            setTimeout(() => {
                treeNode.props.dataRef.children = [
                    {
                        title: 'Child Node1',
                        key: `${treeNode.props.eventKey}-0`
                    },
                    { title: 'Child Node2', key: `${treeNode.props.eventKey}-1` },
                    { title: 'Child Node3', key: `${treeNode.props.eventKey}-2` },
                    { title: 'Child Node4', key: `${treeNode.props.eventKey}-3` },
                ];
                this.setState({
                    treeData: [...this.state.treeData],
                });
                resolve();
            }, 1000);
        });
    }

    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} dataRef={item} />;
        });
    }

    render() {
        return (
            <Tree
                loadData={this.onLoadData}
                expandedKeys={['0']}
            >
                {this.renderTreeNodes(this.state.treeData)}
            </Tree>
        );
    }
}


ReactDOM.render(<Demo />, document.getElementById('root'));
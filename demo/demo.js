Chart.ready(() => {
    const basicX = 150;
    const startY = 20;
    const endY = 550;
    const newX = 50;
    const newY = 50;

    let _current = null; // 当前选择节点id

    let _showNodeInfo = (data) => {
        if (!data) {
            return;
        }

        let infoPanel = $('.right');
        infoPanel.find('#inputTitle').val(data.name || ''); //结点名称
        infoPanel.find('#inputRemark').text(data.description || ''); //结点备注
        infoPanel.find("#ddlOperate").val(data.operate||''); //结点操作
        infoPanel.find("#inputLimit").val(data.limittime||'0'); //限制时间
        infoPanel.find("#inputCreator").val(data.creatorid||''); //创建人
        infoPanel.find("#inputCreateTime").val(data.createtime|| ''); // 创建时间
        // flag 标志(1表示起点，2表示终点，默认为0)
    };

    let _hideNodeInfo = () => {
        _showNodeInfo({
            name: '',
            description: '',
            operate: '',
            limittime: '',
            creatorid: '',
            createtime: '',
            flag:0
        });
    };

    let _createChart = function() {
        return new Chart($('#demo-chart'), {
            onNodeClick (data) { // 点击节点时触发
                _showNodeInfo(data);
                _current = data.nodeId;
            },
            onNodeDel (data) {
                console.log(data);
                _hideNodeInfo();
            }
        })
    };

    let chart = _createChart();

    //添加开始节点
    let nodeStart = chart.addNode('起点', basicX, startY, {
        class: 'node-start',
        removable: false,
        data: {
            name: '起点',
            flag: 1,
            limittime:-1
        }
    });
    nodeStart.addPort({
        isSource: true
    });

    //添加结束节点
    let nodeEnd = chart.addNode('终点', basicX, endY, {
        class: 'node-end',
        removable: false,
        data: {
            name: '终点',
            flag: 2,
            limittime:-1
        }
    });
    nodeEnd.addPort({
        isTarget: true,
        position: 'Top'
    });

    const addNewTask = (name, params) => {
        params = params || {};
        params.data = params.data || {};
        params.class = 'node-process';
        params.data.flag = 0; // 流程节点类型
        let node = chart.addNode(name, newX, newY, params);
        node.addPort({
            isSource: true
        });
        node.addPort({
            isTarget: true,
            position: 'Top'
        });
    };

    const bindEvent = () => {
         $(".flowchart-panel").on('click', '.btn-add', function(event) {
            let target = $(event.target);
            let node = target.data('node');
            addNewTask(node.name, {
                data: node
            });
        });

        $(".btn-save").click(() => {
            $('#jsonOutput').val(JSON.stringify(chart.toJson()));
        });

        $(".btn-load").click(() => {
            if ($('#demo-chart').length === 0) {
                $('<div id="demo-chart"></div>').appendTo($('.middle'));
                chart = _createChart();
            }
            chart.fromJson($('#jsonOutput').val());
        });

        $(".btn-clear").click(() => {
            $('#demo-chart').remove();
            chart.clear();
        });

        // $(".btn-del").click(() => {
        //     if (!_current) {
        //         return;
        //     }

        //     chart.removeNode(_current);
        // });
    };

    bindEvent();

    // 使用测试数据
    let listHtml = '';
    TEST_NODES.forEach(node => {
        listHtml += `<li><span class='node-name'>${node.name}</span><a class='btn-add' data-id='node.procId' href='javascript:void(0)'>添加</a></li>`;
    });
    $('.nodes').html(listHtml);
    $('.nodes').find('.btn-add').each(function(index) {
        $(this).data('node', $.extend({}, TEST_NODES[index]));
    });
});

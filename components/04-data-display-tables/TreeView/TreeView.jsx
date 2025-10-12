import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * TreeView Component - Accessible hierarchical tree navigation
 */
export const TreeView = ({
  data = [],
  expandedNodes = [],
  selectedNodes = [],
  multiSelect = false,
  defaultExpanded = false,
  onNodeToggle,
  onNodeSelect,
  onNodeClick,
  renderNode,
  getNodeId,
  getChildren,
  variant = 'default',
  size = 'md',
  'aria-label': ariaLabel = 'Tree view',
  className = '',
  ...props
}) => {
  const [internalExpanded, setInternalExpanded] = useState(new Set(expandedNodes));
  const [internalSelected, setInternalSelected] = useState(new Set(selectedNodes));
  const [focusedNodeId, setFocusedNodeId] = useState(null);
  const treeRef = useRef(null);
  const nodeRefs = useRef(new Map());

  const isControlledExpanded = expandedNodes !== undefined;
  const isControlledSelected = selectedNodes !== undefined;
  const currentExpanded = isControlledExpanded ? new Set(expandedNodes) : internalExpanded;
  const currentSelected = isControlledSelected ? new Set(selectedNodes) : internalSelected;

  const classes = [
    'tree-view',
    `tree-view--${variant}`,
    `tree-view--${size}`,
    multiSelect && 'tree-view--multi-select',
    className
  ].filter(Boolean).join(' ');

  // Helper functions
  const getNodeIdValue = useCallback((node) => {
    return getNodeId ? getNodeId(node) : node.id;
  }, [getNodeId]);

  const getNodeChildren = useCallback((node) => {
    return getChildren ? getChildren(node) : node.children;
  }, [getChildren]);

  const hasChildren = useCallback((node) => {
    const children = getNodeChildren(node);
    return children && children.length > 0;
  }, [getNodeChildren]);

  const isExpanded = useCallback((nodeId) => {
    return currentExpanded.has(nodeId);
  }, [currentExpanded]);

  const isSelected = useCallback((nodeId) => {
    return currentSelected.has(nodeId);
  }, [currentSelected]);

  // Node manipulation
  const toggleNode = useCallback((nodeId, node) => {
    const newExpanded = new Set(currentExpanded);
    
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }

    if (!isControlledExpanded) {
      setInternalExpanded(newExpanded);
    }
    
    onNodeToggle?.(nodeId, !currentExpanded.has(nodeId), node);
  }, [currentExpanded, isControlledExpanded, onNodeToggle]);

  const selectNode = useCallback((nodeId, node) => {
    const newSelected = new Set(currentSelected);
    
    if (multiSelect) {
      if (newSelected.has(nodeId)) {
        newSelected.delete(nodeId);
      } else {
        newSelected.add(nodeId);
      }
    } else {
      newSelected.clear();
      newSelected.add(nodeId);
    }

    if (!isControlledSelected) {
      setInternalSelected(newSelected);
    }
    
    onNodeSelect?.(nodeId, newSelected.has(nodeId), node, Array.from(newSelected));
  }, [currentSelected, multiSelect, isControlledSelected, onNodeSelect]);

  // Flatten tree for keyboard navigation
  const flattenTree = useCallback((nodes, level = 0, parentId = null) => {
    const flattened = [];
    
    nodes.forEach(node => {
      const nodeId = getNodeIdValue(node);
      const children = getNodeChildren(node);
      
      flattened.push({
        node,
        nodeId,
        level,
        parentId,
        hasChildren: hasChildren(node),
        isExpanded: isExpanded(nodeId)
      });
      
      if (children && isExpanded(nodeId)) {
        flattened.push(...flattenTree(children, level + 1, nodeId));
      }
    });
    
    return flattened;
  }, [getNodeIdValue, getNodeChildren, hasChildren, isExpanded]);

  const flatTree = flattenTree(data);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!focusedNodeId) return;
    
    const currentIndex = flatTree.findIndex(item => item.nodeId === focusedNodeId);
    if (currentIndex === -1) return;
    
    const currentItem = flatTree[currentIndex];
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < flatTree.length - 1) {
          const nextItem = flatTree[currentIndex + 1];
          setFocusedNodeId(nextItem.nodeId);
          nodeRefs.current.get(nextItem.nodeId)?.focus();
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          const prevItem = flatTree[currentIndex - 1];
          setFocusedNodeId(prevItem.nodeId);
          nodeRefs.current.get(prevItem.nodeId)?.focus();
        }
        break;
        
      case 'ArrowRight':
        e.preventDefault();
        if (currentItem.hasChildren) {
          if (!currentItem.isExpanded) {
            toggleNode(currentItem.nodeId, currentItem.node);
          } else {
            // Move to first child
            const childIndex = currentIndex + 1;
            if (childIndex < flatTree.length) {
              const childItem = flatTree[childIndex];
              setFocusedNodeId(childItem.nodeId);
              nodeRefs.current.get(childItem.nodeId)?.focus();
            }
          }
        }
        break;
        
      case 'ArrowLeft':
        e.preventDefault();
        if (currentItem.hasChildren && currentItem.isExpanded) {
          toggleNode(currentItem.nodeId, currentItem.node);
        } else if (currentItem.parentId) {
          // Move to parent
          setFocusedNodeId(currentItem.parentId);
          nodeRefs.current.get(currentItem.parentId)?.focus();
        }
        break;
        
      case 'Enter':
      case ' ':
        e.preventDefault();
        selectNode(currentItem.nodeId, currentItem.node);
        onNodeClick?.(currentItem.nodeId, currentItem.node);
        break;
        
      case 'Home':
        e.preventDefault();
        if (flatTree.length > 0) {
          const firstItem = flatTree[0];
          setFocusedNodeId(firstItem.nodeId);
          nodeRefs.current.get(firstItem.nodeId)?.focus();
        }
        break;
        
      case 'End':
        e.preventDefault();
        if (flatTree.length > 0) {
          const lastItem = flatTree[flatTree.length - 1];
          setFocusedNodeId(lastItem.nodeId);
          nodeRefs.current.get(lastItem.nodeId)?.focus();
        }
        break;
    }
  }, [focusedNodeId, flatTree, toggleNode, selectNode, onNodeClick]);

  // Render tree node
  const renderTreeNode = useCallback((node, level = 0) => {
    const nodeId = getNodeIdValue(node);
    const children = getNodeChildren(node);
    const nodeHasChildren = hasChildren(node);
    const nodeIsExpanded = isExpanded(nodeId);
    const nodeIsSelected = isSelected(nodeId);
    const isFocused = focusedNodeId === nodeId;
    
    const nodeClasses = [
      'tree-view__node',
      `tree-view__node--level-${level}`,
      nodeIsSelected && 'tree-view__node--selected',
      isFocused && 'tree-view__node--focused',
      node.disabled && 'tree-view__node--disabled'
    ].filter(Boolean).join(' ');

    const handleNodeClick = () => {
      if (node.disabled) return;
      
      setFocusedNodeId(nodeId);
      selectNode(nodeId, node);
      onNodeClick?.(nodeId, node);
    };

    const handleToggleClick = (e) => {
      e.stopPropagation();
      if (node.disabled) return;
      
      toggleNode(nodeId, node);
    };

    const handleNodeFocus = () => {
      setFocusedNodeId(nodeId);
    };

    return (
      <React.Fragment key={nodeId}>
        <div className={nodeClasses}>
          {/* Indentation */}
          <div 
            className="tree-view__indent" 
            style={{ '--level': level }} 
            aria-hidden="true"
          />
          
          {/* Expand/collapse button */}
          {nodeHasChildren ? (
            <button
              type="button"
              className="tree-view__toggle"
              onClick={handleToggleClick}
              aria-expanded={nodeIsExpanded}
              aria-label={nodeIsExpanded ? 'Collapse' : 'Expand'}
              tabIndex={-1}
            >
              <span className="tree-view__toggle-icon" aria-hidden="true">
                {nodeIsExpanded ? '▼' : '▶'}
              </span>
            </button>
          ) : (
            <div className="tree-view__spacer" aria-hidden="true" />
          )}
          
          {/* Node content */}
          <div
            ref={(el) => {
              if (el) {
                nodeRefs.current.set(nodeId, el);
              } else {
                nodeRefs.current.delete(nodeId);
              }
            }}
            className="tree-view__content"
            role="treeitem"
            tabIndex={isFocused ? 0 : -1}
            aria-selected={nodeIsSelected}
            aria-expanded={nodeHasChildren ? nodeIsExpanded : undefined}
            aria-level={level + 1}
            aria-setsize={data.length}
            aria-disabled={node.disabled}
            onClick={handleNodeClick}
            onFocus={handleNodeFocus}
          >
            {renderNode ? renderNode(node, { 
              level, 
              isExpanded: nodeIsExpanded, 
              isSelected: nodeIsSelected,
              hasChildren: nodeHasChildren 
            }) : (
              <>
                {node.icon && (
                  <span className="tree-view__icon" aria-hidden="true">
                    {node.icon}
                  </span>
                )}
                <span className="tree-view__label">
                  {node.label || node.name || nodeId}
                </span>
                {node.badge && (
                  <span className="tree-view__badge">
                    {node.badge}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
        
        {/* Children */}
        {nodeHasChildren && nodeIsExpanded && (
          <div className="tree-view__children" role="group">
            {children.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </React.Fragment>
    );
  }, [getNodeIdValue, getNodeChildren, hasChildren, isExpanded, isSelected, focusedNodeId, selectNode, toggleNode, onNodeClick, renderNode, data.length]);

  // Auto-focus first node if none is focused
  React.useEffect(() => {
    if (!focusedNodeId && flatTree.length > 0) {
      setFocusedNodeId(flatTree[0].nodeId);
    }
  }, [focusedNodeId, flatTree]);

  return (
    <div
      ref={treeRef}
      className={classes}
      role="tree"
      aria-label={ariaLabel}
      aria-multiselectable={multiSelect}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {data.map(node => renderTreeNode(node, 0))}
    </div>
  );
};

TreeView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  expandedNodes: PropTypes.array,
  selectedNodes: PropTypes.array,
  multiSelect: PropTypes.bool,
  defaultExpanded: PropTypes.bool,
  onNodeToggle: PropTypes.func,
  onNodeSelect: PropTypes.func,
  onNodeClick: PropTypes.func,
  renderNode: PropTypes.func,
  getNodeId: PropTypes.func,
  getChildren: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'compact', 'comfortable']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  'aria-label': PropTypes.string,
  className: PropTypes.string,
};

export default TreeView;

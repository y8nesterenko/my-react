import React from 'react';
import {create} from 'react-test-renderer';
import ProfileStatus from "./ProfileStatus";

describe('ProfileStatus Component', () => {

    test('status should be in state', () => {
        const component = create(<ProfileStatus status='Go for your dream'/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('Go for your dream');
    });

    test('after creation span should be displayed', () => {
        const component = create(<ProfileStatus status='Go for your dream'/>);
        const root = component.root;
        let span = root.findByType('span');
        expect(span).not.toBeNull();
    });

    test("after creation input shouldn't be displayed", () => {
        const component = create(<ProfileStatus status='Go for your dream'/>);
        const root = component.root;
        expect(() => {
            let input = root.findByType('input');
        }).toThrow();
    });

    test('after creation span should contains correct status', () => {
        const component = create(<ProfileStatus status='Go for your dream'/>);
        const root = component.root;
        let span = root.findByType('span');
        expect(span.children[0]).toBe('Go for your dream');
    });

    test('callback should be called', () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status='Go for your dream' updateUserStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.editModeOff();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
})
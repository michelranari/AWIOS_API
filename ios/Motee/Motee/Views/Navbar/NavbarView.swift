//
//  NavbarView.swift
//  Motee
//
//  Created by Rayan Bahroun on 07/03/2020.
//  Copyright © 2020 groupe3. All rights reserved.
//

import SwiftUI

struct NavbarView: View {
    
    @State var showMenu = false
    @State var filter = "all"
    @State var currentPage = "Accueil"
    var body: some View {
        let drag = DragGesture()
            .onEnded {
                if $0.translation.width < -100 {
                    withAnimation {
                        self.showMenu = false
                    }
                }
            }
        
        return NavigationView {
            GeometryReader { geometry in
                ZStack(alignment: .leading) {
                    Root(currentPage: self.currentPage)
                    if self.showMenu {
                        MenuView(currentPage : self.$currentPage)
                            .frame(width: geometry.size.width/2)
                            .transition(.move(edge: .leading))
                    }
                }.gesture(drag)
            }
            .navigationBarTitle(Text(currentPage), displayMode: .inline)
            .navigationBarItems(leading: (
                Button(action: {
                    withAnimation {
                        self.showMenu.toggle()
                    }
                }) {
                    SymbolGenerator(mySymbol: "line.horizontal.3", myColor: "black")
                        .imageScale(.large)
                })
                , trailing : Filter(filter: $filter))
        }
    }
}

struct NavbarView_Previews: PreviewProvider {
    static var previews: some View {
        NavbarView()
    }
}
